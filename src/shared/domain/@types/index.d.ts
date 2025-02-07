interface ImportMeta {
    readonly systemEnv: SystemEnv;
    readonly DatabaseEnv: DatabaseEnv;
    readonly AuthenticationStrategiesEnv: AuthenticationStrategiesEnv;
    readonly AwsEnv: AwsEnv;
}

interface SystemEnv {
    NODE_ENV: "development" | "production" | "test"
    REST_PORT: number
    SECRETKEY: string
    SECRETKEYTOKEN: string
}

interface DatabaseEnv {
    DB_DIALECT: string
    DB_USER: string
    DB_PASS: string
    DB_HOST: string
    DB_PORT: number
    DB_NAME: string
    DATABASE_LOGS: string
}

interface AuthenticationStrategiesEnv {
    GOOGLE_CLIENT_ID: string
}

interface AwsEnv {
    AWS_REGION: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    AWS_BUCKET_NAME: string
}