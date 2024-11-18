import { SetMetadata } from '@nestjs/common';

export const IN_MEMORY_DB_KEY = process.env.MEMORY_DB_KEY ?? 'IN_MEMORY_DB_KEY';

export function MemoryDB(target: Function): void {
  SetMetadata(IN_MEMORY_DB_KEY, target)(target);
}
