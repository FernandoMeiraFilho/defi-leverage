import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

export default await MikroORM.init(config);
