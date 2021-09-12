import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFn,
  Runtime,
} from "aws-cdk-lib/lib/aws-lambda";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/lib/aws-apigateway";
import { join } from "path";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFn(this, "HelloLambda", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, "..", "services", "hello")),
      handler: "hello.main",
    });

    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource("hello");

    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
