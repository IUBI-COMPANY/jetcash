interface Config {
  common: ConfigCommon;
  development: ConfigEnvironment;
  production: ConfigEnvironment;
}

interface ConfigCommon {
  "node-mailer": NodeMailerConfig;
}

interface NodeMailerConfig {
  port: number;
  host: string;
  from: string;
  user: string;
  pass: string;
}

interface ConfigEnvironment {
  "apis-net-pe": ApisNetPeConfig;
  hosting: HostingConfig;
}

interface HostingConfig {
  domain: string;
  apiUrl: string;
}

export const config: Config = {
  common: {
    "node-mailer": {
      port: 465,
      host: "",
      from: "",
      user: "",
      pass: "",
    },
  },
  development: {
    hosting: {
      domain: "https://jetcash.web.app",
      apiUrl: "https://jetcash.web.app/api",
    },
    "apis-net-pe": {
      apiUrl: "https://api.apis.net.pe/v2",
      token: "",
    },
  },
  production: {
    hosting: {
      domain: "https://jetcash.web.app",
      apiUrl: "https://jetcash.web.app/api",
    },
    "apis-net-pe": {
      apiUrl: "https://api.apis.net.pe/v2",
      token: "",
    },
  },
};
