// import Koa from 'koa';
// import { Container } from 'inversify';

// declare module 'koa' {
//     interface Context extends Koa.Context {
//         container: Container;
//     }
// }

// import Cloud from '@google-cloud/spanner';
// import { RunPromise } from '@google-cloud/spanner/build/src/transaction';
// declare module '@google-cloud/spanner' {
//     class Spanner extends Cloud.Spanner {
//         instance(name: string): Cloud.Instance;
//     }
//     class Database extends Cloud.Database {
//         run(query: any, options?: any, callback?: any): RunPromise;
//     }
// }