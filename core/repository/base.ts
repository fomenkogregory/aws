import { Client } from "pg";
import { Read, Write } from "./interfaces";

export abstract class BaseRepository<T> implements Read<T>, Write<T> {
  public constructor(protected readonly client: Client) {
  }

  public abstract find(): Promise<T[]>

  public abstract findOne(id: string): Promise<T>

  public abstract create(item: T): Promise<T>

  public abstract delete(id: string): Promise<void>

  public abstract update(id: string, item: T): Promise<T>
}
