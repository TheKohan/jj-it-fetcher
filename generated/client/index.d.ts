
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model B2BOffer
 * 
 */
export type B2BOffer = $Result.DefaultSelection<Prisma.$B2BOfferPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more B2BOffers
 * const b2BOffers = await prisma.b2BOffer.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more B2BOffers
   * const b2BOffers = await prisma.b2BOffer.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.b2BOffer`: Exposes CRUD operations for the **B2BOffer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more B2BOffers
    * const b2BOffers = await prisma.b2BOffer.findMany()
    * ```
    */
  get b2BOffer(): Prisma.B2BOfferDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.7.1
   * Query Engine version: 0ca5ccbcfa6bdc81c003cf549abe4269f59c41e5
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    B2BOffer: 'B2BOffer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'b2BOffer'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      B2BOffer: {
        payload: Prisma.$B2BOfferPayload<ExtArgs>
        fields: Prisma.B2BOfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.B2BOfferFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.B2BOfferFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          findFirst: {
            args: Prisma.B2BOfferFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.B2BOfferFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          findMany: {
            args: Prisma.B2BOfferFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>[]
          }
          create: {
            args: Prisma.B2BOfferCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          createMany: {
            args: Prisma.B2BOfferCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.B2BOfferDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          update: {
            args: Prisma.B2BOfferUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          deleteMany: {
            args: Prisma.B2BOfferDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.B2BOfferUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.B2BOfferUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$B2BOfferPayload>
          }
          aggregate: {
            args: Prisma.B2BOfferAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateB2BOffer>
          }
          groupBy: {
            args: Prisma.B2BOfferGroupByArgs<ExtArgs>,
            result: $Utils.Optional<B2BOfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.B2BOfferCountArgs<ExtArgs>,
            result: $Utils.Optional<B2BOfferCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model B2BOffer
   */

  export type AggregateB2BOffer = {
    _count: B2BOfferCountAggregateOutputType | null
    _avg: B2BOfferAvgAggregateOutputType | null
    _sum: B2BOfferSumAggregateOutputType | null
    _min: B2BOfferMinAggregateOutputType | null
    _max: B2BOfferMaxAggregateOutputType | null
  }

  export type B2BOfferAvgAggregateOutputType = {
    id: number | null
    fromPln: number | null
    toPln: number | null
  }

  export type B2BOfferSumAggregateOutputType = {
    id: number | null
    fromPln: number | null
    toPln: number | null
  }

  export type B2BOfferMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    slug: string | null
    title: string | null
    url: string | null
    city: string | null
    fromPln: number | null
    toPln: number | null
    requiredSkills: string | null
    companyName: string | null
  }

  export type B2BOfferMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    slug: string | null
    title: string | null
    url: string | null
    city: string | null
    fromPln: number | null
    toPln: number | null
    requiredSkills: string | null
    companyName: string | null
  }

  export type B2BOfferCountAggregateOutputType = {
    id: number
    createdAt: number
    slug: number
    title: number
    url: number
    city: number
    fromPln: number
    toPln: number
    requiredSkills: number
    companyName: number
    _all: number
  }


  export type B2BOfferAvgAggregateInputType = {
    id?: true
    fromPln?: true
    toPln?: true
  }

  export type B2BOfferSumAggregateInputType = {
    id?: true
    fromPln?: true
    toPln?: true
  }

  export type B2BOfferMinAggregateInputType = {
    id?: true
    createdAt?: true
    slug?: true
    title?: true
    url?: true
    city?: true
    fromPln?: true
    toPln?: true
    requiredSkills?: true
    companyName?: true
  }

  export type B2BOfferMaxAggregateInputType = {
    id?: true
    createdAt?: true
    slug?: true
    title?: true
    url?: true
    city?: true
    fromPln?: true
    toPln?: true
    requiredSkills?: true
    companyName?: true
  }

  export type B2BOfferCountAggregateInputType = {
    id?: true
    createdAt?: true
    slug?: true
    title?: true
    url?: true
    city?: true
    fromPln?: true
    toPln?: true
    requiredSkills?: true
    companyName?: true
    _all?: true
  }

  export type B2BOfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which B2BOffer to aggregate.
     */
    where?: B2BOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of B2BOffers to fetch.
     */
    orderBy?: B2BOfferOrderByWithRelationInput | B2BOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: B2BOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` B2BOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` B2BOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned B2BOffers
    **/
    _count?: true | B2BOfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: B2BOfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: B2BOfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: B2BOfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: B2BOfferMaxAggregateInputType
  }

  export type GetB2BOfferAggregateType<T extends B2BOfferAggregateArgs> = {
        [P in keyof T & keyof AggregateB2BOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateB2BOffer[P]>
      : GetScalarType<T[P], AggregateB2BOffer[P]>
  }




  export type B2BOfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: B2BOfferWhereInput
    orderBy?: B2BOfferOrderByWithAggregationInput | B2BOfferOrderByWithAggregationInput[]
    by: B2BOfferScalarFieldEnum[] | B2BOfferScalarFieldEnum
    having?: B2BOfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: B2BOfferCountAggregateInputType | true
    _avg?: B2BOfferAvgAggregateInputType
    _sum?: B2BOfferSumAggregateInputType
    _min?: B2BOfferMinAggregateInputType
    _max?: B2BOfferMaxAggregateInputType
  }

  export type B2BOfferGroupByOutputType = {
    id: number
    createdAt: Date
    slug: string
    title: string
    url: string
    city: string
    fromPln: number
    toPln: number
    requiredSkills: string
    companyName: string
    _count: B2BOfferCountAggregateOutputType | null
    _avg: B2BOfferAvgAggregateOutputType | null
    _sum: B2BOfferSumAggregateOutputType | null
    _min: B2BOfferMinAggregateOutputType | null
    _max: B2BOfferMaxAggregateOutputType | null
  }

  type GetB2BOfferGroupByPayload<T extends B2BOfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<B2BOfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof B2BOfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], B2BOfferGroupByOutputType[P]>
            : GetScalarType<T[P], B2BOfferGroupByOutputType[P]>
        }
      >
    >


  export type B2BOfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    slug?: boolean
    title?: boolean
    url?: boolean
    city?: boolean
    fromPln?: boolean
    toPln?: boolean
    requiredSkills?: boolean
    companyName?: boolean
  }, ExtArgs["result"]["b2BOffer"]>

  export type B2BOfferSelectScalar = {
    id?: boolean
    createdAt?: boolean
    slug?: boolean
    title?: boolean
    url?: boolean
    city?: boolean
    fromPln?: boolean
    toPln?: boolean
    requiredSkills?: boolean
    companyName?: boolean
  }


  export type $B2BOfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "B2BOffer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      slug: string
      title: string
      url: string
      city: string
      fromPln: number
      toPln: number
      requiredSkills: string
      companyName: string
    }, ExtArgs["result"]["b2BOffer"]>
    composites: {}
  }


  type B2BOfferGetPayload<S extends boolean | null | undefined | B2BOfferDefaultArgs> = $Result.GetResult<Prisma.$B2BOfferPayload, S>

  type B2BOfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<B2BOfferFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: B2BOfferCountAggregateInputType | true
    }

  export interface B2BOfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['B2BOffer'], meta: { name: 'B2BOffer' } }
    /**
     * Find zero or one B2BOffer that matches the filter.
     * @param {B2BOfferFindUniqueArgs} args - Arguments to find a B2BOffer
     * @example
     * // Get one B2BOffer
     * const b2BOffer = await prisma.b2BOffer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends B2BOfferFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferFindUniqueArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one B2BOffer that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {B2BOfferFindUniqueOrThrowArgs} args - Arguments to find a B2BOffer
     * @example
     * // Get one B2BOffer
     * const b2BOffer = await prisma.b2BOffer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends B2BOfferFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first B2BOffer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferFindFirstArgs} args - Arguments to find a B2BOffer
     * @example
     * // Get one B2BOffer
     * const b2BOffer = await prisma.b2BOffer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends B2BOfferFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferFindFirstArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first B2BOffer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferFindFirstOrThrowArgs} args - Arguments to find a B2BOffer
     * @example
     * // Get one B2BOffer
     * const b2BOffer = await prisma.b2BOffer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends B2BOfferFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more B2BOffers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all B2BOffers
     * const b2BOffers = await prisma.b2BOffer.findMany()
     * 
     * // Get first 10 B2BOffers
     * const b2BOffers = await prisma.b2BOffer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const b2BOfferWithIdOnly = await prisma.b2BOffer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends B2BOfferFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a B2BOffer.
     * @param {B2BOfferCreateArgs} args - Arguments to create a B2BOffer.
     * @example
     * // Create one B2BOffer
     * const B2BOffer = await prisma.b2BOffer.create({
     *   data: {
     *     // ... data to create a B2BOffer
     *   }
     * })
     * 
    **/
    create<T extends B2BOfferCreateArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferCreateArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many B2BOffers.
     *     @param {B2BOfferCreateManyArgs} args - Arguments to create many B2BOffers.
     *     @example
     *     // Create many B2BOffers
     *     const b2BOffer = await prisma.b2BOffer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends B2BOfferCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a B2BOffer.
     * @param {B2BOfferDeleteArgs} args - Arguments to delete one B2BOffer.
     * @example
     * // Delete one B2BOffer
     * const B2BOffer = await prisma.b2BOffer.delete({
     *   where: {
     *     // ... filter to delete one B2BOffer
     *   }
     * })
     * 
    **/
    delete<T extends B2BOfferDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferDeleteArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one B2BOffer.
     * @param {B2BOfferUpdateArgs} args - Arguments to update one B2BOffer.
     * @example
     * // Update one B2BOffer
     * const b2BOffer = await prisma.b2BOffer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends B2BOfferUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferUpdateArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more B2BOffers.
     * @param {B2BOfferDeleteManyArgs} args - Arguments to filter B2BOffers to delete.
     * @example
     * // Delete a few B2BOffers
     * const { count } = await prisma.b2BOffer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends B2BOfferDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, B2BOfferDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more B2BOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many B2BOffers
     * const b2BOffer = await prisma.b2BOffer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends B2BOfferUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one B2BOffer.
     * @param {B2BOfferUpsertArgs} args - Arguments to update or create a B2BOffer.
     * @example
     * // Update or create a B2BOffer
     * const b2BOffer = await prisma.b2BOffer.upsert({
     *   create: {
     *     // ... data to create a B2BOffer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the B2BOffer we want to update
     *   }
     * })
    **/
    upsert<T extends B2BOfferUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, B2BOfferUpsertArgs<ExtArgs>>
    ): Prisma__B2BOfferClient<$Result.GetResult<Prisma.$B2BOfferPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of B2BOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferCountArgs} args - Arguments to filter B2BOffers to count.
     * @example
     * // Count the number of B2BOffers
     * const count = await prisma.b2BOffer.count({
     *   where: {
     *     // ... the filter for the B2BOffers we want to count
     *   }
     * })
    **/
    count<T extends B2BOfferCountArgs>(
      args?: Subset<T, B2BOfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], B2BOfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a B2BOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends B2BOfferAggregateArgs>(args: Subset<T, B2BOfferAggregateArgs>): Prisma.PrismaPromise<GetB2BOfferAggregateType<T>>

    /**
     * Group by B2BOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {B2BOfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends B2BOfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: B2BOfferGroupByArgs['orderBy'] }
        : { orderBy?: B2BOfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, B2BOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetB2BOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the B2BOffer model
   */
  readonly fields: B2BOfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for B2BOffer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__B2BOfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the B2BOffer model
   */ 
  interface B2BOfferFieldRefs {
    readonly id: FieldRef<"B2BOffer", 'Int'>
    readonly createdAt: FieldRef<"B2BOffer", 'DateTime'>
    readonly slug: FieldRef<"B2BOffer", 'String'>
    readonly title: FieldRef<"B2BOffer", 'String'>
    readonly url: FieldRef<"B2BOffer", 'String'>
    readonly city: FieldRef<"B2BOffer", 'String'>
    readonly fromPln: FieldRef<"B2BOffer", 'Float'>
    readonly toPln: FieldRef<"B2BOffer", 'Float'>
    readonly requiredSkills: FieldRef<"B2BOffer", 'String'>
    readonly companyName: FieldRef<"B2BOffer", 'String'>
  }
    

  // Custom InputTypes

  /**
   * B2BOffer findUnique
   */
  export type B2BOfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter, which B2BOffer to fetch.
     */
    where: B2BOfferWhereUniqueInput
  }


  /**
   * B2BOffer findUniqueOrThrow
   */
  export type B2BOfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter, which B2BOffer to fetch.
     */
    where: B2BOfferWhereUniqueInput
  }


  /**
   * B2BOffer findFirst
   */
  export type B2BOfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter, which B2BOffer to fetch.
     */
    where?: B2BOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of B2BOffers to fetch.
     */
    orderBy?: B2BOfferOrderByWithRelationInput | B2BOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for B2BOffers.
     */
    cursor?: B2BOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` B2BOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` B2BOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of B2BOffers.
     */
    distinct?: B2BOfferScalarFieldEnum | B2BOfferScalarFieldEnum[]
  }


  /**
   * B2BOffer findFirstOrThrow
   */
  export type B2BOfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter, which B2BOffer to fetch.
     */
    where?: B2BOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of B2BOffers to fetch.
     */
    orderBy?: B2BOfferOrderByWithRelationInput | B2BOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for B2BOffers.
     */
    cursor?: B2BOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` B2BOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` B2BOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of B2BOffers.
     */
    distinct?: B2BOfferScalarFieldEnum | B2BOfferScalarFieldEnum[]
  }


  /**
   * B2BOffer findMany
   */
  export type B2BOfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter, which B2BOffers to fetch.
     */
    where?: B2BOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of B2BOffers to fetch.
     */
    orderBy?: B2BOfferOrderByWithRelationInput | B2BOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing B2BOffers.
     */
    cursor?: B2BOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` B2BOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` B2BOffers.
     */
    skip?: number
    distinct?: B2BOfferScalarFieldEnum | B2BOfferScalarFieldEnum[]
  }


  /**
   * B2BOffer create
   */
  export type B2BOfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * The data needed to create a B2BOffer.
     */
    data: XOR<B2BOfferCreateInput, B2BOfferUncheckedCreateInput>
  }


  /**
   * B2BOffer createMany
   */
  export type B2BOfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many B2BOffers.
     */
    data: B2BOfferCreateManyInput | B2BOfferCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * B2BOffer update
   */
  export type B2BOfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * The data needed to update a B2BOffer.
     */
    data: XOR<B2BOfferUpdateInput, B2BOfferUncheckedUpdateInput>
    /**
     * Choose, which B2BOffer to update.
     */
    where: B2BOfferWhereUniqueInput
  }


  /**
   * B2BOffer updateMany
   */
  export type B2BOfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update B2BOffers.
     */
    data: XOR<B2BOfferUpdateManyMutationInput, B2BOfferUncheckedUpdateManyInput>
    /**
     * Filter which B2BOffers to update
     */
    where?: B2BOfferWhereInput
  }


  /**
   * B2BOffer upsert
   */
  export type B2BOfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * The filter to search for the B2BOffer to update in case it exists.
     */
    where: B2BOfferWhereUniqueInput
    /**
     * In case the B2BOffer found by the `where` argument doesn't exist, create a new B2BOffer with this data.
     */
    create: XOR<B2BOfferCreateInput, B2BOfferUncheckedCreateInput>
    /**
     * In case the B2BOffer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<B2BOfferUpdateInput, B2BOfferUncheckedUpdateInput>
  }


  /**
   * B2BOffer delete
   */
  export type B2BOfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
    /**
     * Filter which B2BOffer to delete.
     */
    where: B2BOfferWhereUniqueInput
  }


  /**
   * B2BOffer deleteMany
   */
  export type B2BOfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which B2BOffers to delete
     */
    where?: B2BOfferWhereInput
  }


  /**
   * B2BOffer without action
   */
  export type B2BOfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the B2BOffer
     */
    select?: B2BOfferSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const B2BOfferScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    slug: 'slug',
    title: 'title',
    url: 'url',
    city: 'city',
    fromPln: 'fromPln',
    toPln: 'toPln',
    requiredSkills: 'requiredSkills',
    companyName: 'companyName'
  };

  export type B2BOfferScalarFieldEnum = (typeof B2BOfferScalarFieldEnum)[keyof typeof B2BOfferScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type B2BOfferWhereInput = {
    AND?: B2BOfferWhereInput | B2BOfferWhereInput[]
    OR?: B2BOfferWhereInput[]
    NOT?: B2BOfferWhereInput | B2BOfferWhereInput[]
    id?: IntFilter<"B2BOffer"> | number
    createdAt?: DateTimeFilter<"B2BOffer"> | Date | string
    slug?: StringFilter<"B2BOffer"> | string
    title?: StringFilter<"B2BOffer"> | string
    url?: StringFilter<"B2BOffer"> | string
    city?: StringFilter<"B2BOffer"> | string
    fromPln?: FloatFilter<"B2BOffer"> | number
    toPln?: FloatFilter<"B2BOffer"> | number
    requiredSkills?: StringFilter<"B2BOffer"> | string
    companyName?: StringFilter<"B2BOffer"> | string
  }

  export type B2BOfferOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    url?: SortOrder
    city?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
    requiredSkills?: SortOrder
    companyName?: SortOrder
  }

  export type B2BOfferWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: B2BOfferWhereInput | B2BOfferWhereInput[]
    OR?: B2BOfferWhereInput[]
    NOT?: B2BOfferWhereInput | B2BOfferWhereInput[]
    createdAt?: DateTimeFilter<"B2BOffer"> | Date | string
    slug?: StringFilter<"B2BOffer"> | string
    title?: StringFilter<"B2BOffer"> | string
    url?: StringFilter<"B2BOffer"> | string
    city?: StringFilter<"B2BOffer"> | string
    fromPln?: FloatFilter<"B2BOffer"> | number
    toPln?: FloatFilter<"B2BOffer"> | number
    requiredSkills?: StringFilter<"B2BOffer"> | string
    companyName?: StringFilter<"B2BOffer"> | string
  }, "id">

  export type B2BOfferOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    url?: SortOrder
    city?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
    requiredSkills?: SortOrder
    companyName?: SortOrder
    _count?: B2BOfferCountOrderByAggregateInput
    _avg?: B2BOfferAvgOrderByAggregateInput
    _max?: B2BOfferMaxOrderByAggregateInput
    _min?: B2BOfferMinOrderByAggregateInput
    _sum?: B2BOfferSumOrderByAggregateInput
  }

  export type B2BOfferScalarWhereWithAggregatesInput = {
    AND?: B2BOfferScalarWhereWithAggregatesInput | B2BOfferScalarWhereWithAggregatesInput[]
    OR?: B2BOfferScalarWhereWithAggregatesInput[]
    NOT?: B2BOfferScalarWhereWithAggregatesInput | B2BOfferScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"B2BOffer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"B2BOffer"> | Date | string
    slug?: StringWithAggregatesFilter<"B2BOffer"> | string
    title?: StringWithAggregatesFilter<"B2BOffer"> | string
    url?: StringWithAggregatesFilter<"B2BOffer"> | string
    city?: StringWithAggregatesFilter<"B2BOffer"> | string
    fromPln?: FloatWithAggregatesFilter<"B2BOffer"> | number
    toPln?: FloatWithAggregatesFilter<"B2BOffer"> | number
    requiredSkills?: StringWithAggregatesFilter<"B2BOffer"> | string
    companyName?: StringWithAggregatesFilter<"B2BOffer"> | string
  }

  export type B2BOfferCreateInput = {
    createdAt?: Date | string
    slug: string
    title: string
    url: string
    city: string
    fromPln: number
    toPln: number
    requiredSkills: string
    companyName: string
  }

  export type B2BOfferUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    slug: string
    title: string
    url: string
    city: string
    fromPln: number
    toPln: number
    requiredSkills: string
    companyName: string
  }

  export type B2BOfferUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    fromPln?: FloatFieldUpdateOperationsInput | number
    toPln?: FloatFieldUpdateOperationsInput | number
    requiredSkills?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
  }

  export type B2BOfferUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    fromPln?: FloatFieldUpdateOperationsInput | number
    toPln?: FloatFieldUpdateOperationsInput | number
    requiredSkills?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
  }

  export type B2BOfferCreateManyInput = {
    id?: number
    createdAt?: Date | string
    slug: string
    title: string
    url: string
    city: string
    fromPln: number
    toPln: number
    requiredSkills: string
    companyName: string
  }

  export type B2BOfferUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    fromPln?: FloatFieldUpdateOperationsInput | number
    toPln?: FloatFieldUpdateOperationsInput | number
    requiredSkills?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
  }

  export type B2BOfferUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    fromPln?: FloatFieldUpdateOperationsInput | number
    toPln?: FloatFieldUpdateOperationsInput | number
    requiredSkills?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type B2BOfferCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    url?: SortOrder
    city?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
    requiredSkills?: SortOrder
    companyName?: SortOrder
  }

  export type B2BOfferAvgOrderByAggregateInput = {
    id?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
  }

  export type B2BOfferMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    url?: SortOrder
    city?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
    requiredSkills?: SortOrder
    companyName?: SortOrder
  }

  export type B2BOfferMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    url?: SortOrder
    city?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
    requiredSkills?: SortOrder
    companyName?: SortOrder
  }

  export type B2BOfferSumOrderByAggregateInput = {
    id?: SortOrder
    fromPln?: SortOrder
    toPln?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use B2BOfferDefaultArgs instead
     */
    export type B2BOfferArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = B2BOfferDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}