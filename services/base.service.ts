// ============================================
// Base Service — Generic Business Logic Layer
// ============================================

import { Document, Types } from "mongoose";
import { BaseRepository, PaginatedResult } from "@/repositories/base.repository";
import { QueryOptions } from "@/types/api.types";
import { logger } from "@/utils/logger";

export class BaseService<T extends Document> {
  protected repository: BaseRepository<T>;
  protected entityName: string;

  constructor(repository: BaseRepository<T>, entityName: string) {
    this.repository = repository;
    this.entityName = entityName;
  }

  /**
   * Find entity by ID
   */
  async findById(
    id: string,
    select?: string,
    populate?: string | string[]
  ): Promise<T | null> {
    logger.debug(`Finding ${this.entityName} by ID: ${id}`, this.entityName);
    return this.repository.findById(id, select, populate);
  }

  /**
   * Find all entities with pagination
   */
  async findAll(
    filter = {},
    options: QueryOptions = {}
  ): Promise<PaginatedResult<T>> {
    logger.debug(`Finding all ${this.entityName}s`, this.entityName);
    return this.repository.findMany(filter, options);
  }

  /**
   * Create a new entity
   */
  async create(data: Partial<T>): Promise<T> {
    logger.info(`Creating new ${this.entityName}`, this.entityName);
    return this.repository.create(data);
  }

  /**
   * Update an existing entity
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    logger.info(`Updating ${this.entityName}: ${id}`, this.entityName);
    const result = await this.repository.update(id, data);
    if (!result) {
      logger.warn(`${this.entityName} not found: ${id}`, this.entityName);
    }
    return result;
  }

  /**
   * Delete an entity
   */
  async delete(id: string): Promise<T | null> {
    logger.info(`Deleting ${this.entityName}: ${id}`, this.entityName);
    const result = await this.repository.delete(id);
    if (!result) {
      logger.warn(`${this.entityName} not found for deletion: ${id}`, this.entityName);
    }
    return result;
  }

  /**
   * Count entities matching a filter
   */
  async count(filter = {}): Promise<number> {
    return this.repository.count(filter);
  }

  /**
   * Check if an entity exists
   */
  async exists(filter: Record<string, unknown>): Promise<boolean> {
    return this.repository.exists(filter);
  }
}
