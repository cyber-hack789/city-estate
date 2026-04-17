// ============================================
// Base Repository — Generic CRUD Data Access
// ============================================

import mongoose, {
  Model,
  Document,
  Types,
} from "mongoose";
import { QueryOptions, PaginationMeta } from "@/types/api.types";
import { PAGINATION } from "@/config/constants";
import dbConnect from "@/config/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Filter = Record<string, any>;

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  protected async connect(): Promise<void> {
    await dbConnect();
  }

  async findById(
    id: string | Types.ObjectId,
    select?: string,
    populate?: string | string[]
  ): Promise<T | null> {
    await this.connect();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = this.model.findById(id);
    if (select) query = query.select(select);
    if (populate) {
      const pops = Array.isArray(populate) ? populate : [populate];
      pops.forEach((p) => { query = query.populate(p); });
    }
    return query.lean().exec();
  }

  async findOne(
    filter: Filter,
    select?: string,
    populate?: string | string[]
  ): Promise<T | null> {
    await this.connect();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = this.model.findOne(filter);
    if (select) query = query.select(select);
    if (populate) {
      const pops = Array.isArray(populate) ? populate : [populate];
      pops.forEach((p) => { query = query.populate(p); });
    }
    return query.lean().exec();
  }

  async findMany(
    filter: Filter = {},
    options: QueryOptions = {}
  ): Promise<PaginatedResult<T>> {
    await this.connect();

    const page = options.page || PAGINATION.DEFAULT_PAGE;
    const limit = Math.min(
      options.limit || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 as const };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = this.model.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.select) query = query.select(options.select);
    if (options.populate) {
      const pops = Array.isArray(options.populate) ? options.populate : [options.populate];
      pops.forEach((p) => { query = query.populate(p); });
    }

    const [data, total] = await Promise.all([
      query.lean().exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(data: Partial<T>): Promise<T> {
    await this.connect();
    const document = await this.model.create(data);
    return document.toObject() as T;
  }

  async update(
    id: string | Types.ObjectId,
    data: Partial<T>,
    options: mongoose.QueryOptions = { new: true, runValidators: true }
  ): Promise<T | null> {
    await this.connect();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.model as any).findByIdAndUpdate(id, data, options).lean().exec();
  }

  async delete(id: string | Types.ObjectId): Promise<T | null> {
    await this.connect();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.model as any).findByIdAndDelete(id).lean().exec();
  }

  async count(filter: Filter = {}): Promise<number> {
    await this.connect();
    return this.model.countDocuments(filter);
  }

  async exists(filter: Filter): Promise<boolean> {
    await this.connect();
    const doc = await this.model.exists(filter);
    return doc !== null;
  }
}
