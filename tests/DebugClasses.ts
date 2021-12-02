import CoreKernel, {
  CoreClient,
  CoreCryptoClient, CoreDBCon, CoreDBUpdate,
  CoreEntity,
  CoreKernelModule,
  ICoreCClient, ICoreKernelModule, InMemDB,
  OfflineService
 } from "@grandlinex/core";
import ELogger from "../src/class/ELogger";



type TCoreKernel=CoreKernel<ICoreCClient>;

class TestBaseMod extends CoreKernelModule<TCoreKernel,InMemDB,null,null,null> {
  beforeServiceStart(): Promise<void> {
    return Promise.resolve( undefined );
  }

  final(): Promise<void> {
    return Promise.resolve( undefined );
  }

  initModule(): Promise<void> {
    this.setDb(new InMemDB(this))
    return Promise.resolve( undefined );
  }

  startup(): Promise<void> {
    return Promise.resolve( undefined );
  }

}
class TestKernel extends CoreKernel<ICoreCClient> {
  constructor(appName:string, appCode:string,testPath:string) {
    super( { appName, appCode, pathOverride:testPath });
    this.globalLogger=new ELogger(this);
    this.setLogger(this.globalLogger);
    this.setBaseModule(new TestBaseMod("testbase2",this));
    this.setCryptoClient(new CoreCryptoClient(CoreCryptoClient.fromPW("testpw")))
    this.addModule(new TestModuel(this));
   }
}



class TestClient extends CoreClient{

}


class TestDB extends InMemDB{
  constructor(module:ICoreKernelModule<any, any, any, any, any>) {
    super(module );
  }
  initNewDB(): Promise<void> {
    return Promise.resolve( undefined );
  }
}



class TestModuel extends CoreKernelModule<TCoreKernel,TestDB,TestClient,null,null>{
  constructor(kernel:TCoreKernel) {
    super("testModule",kernel);
    this.addService(new OfflineService(this))
  }
  async initModule(): Promise<void> {
    this.setClient(new TestClient("testc",this))
    this.log("FirstTHIS")
    const db=new TestDB(this)
     this.setDb(db)
   }

  startup(): Promise<void> {
    return Promise.resolve( undefined );
  }

  beforeServiceStart(): Promise<void> {
    return Promise.resolve( undefined );
  }

  final(): Promise<void> {
    return Promise.resolve( undefined );
  }

}

export {
  TCoreKernel,
  TestBaseMod,
  TestKernel,
  TestClient,
  TestModuel,
 }
