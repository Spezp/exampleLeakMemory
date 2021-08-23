### memory leak example in nestjs during jest module creation with mongoose

Make modifications to `example.service1.spec.ts` and run:
`npm run test:debug`

This will clone `example.service1.spec.ts` 40 times and run testing with --no-cache --logHeapUsage --runInBand flags.
