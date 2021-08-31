import * as cdk from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { CfnOutput, CfnParameter, Duration } from "@aws-cdk/core";

export class AwsTsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const duration = new CfnParameter(this, "duration", {
      type: "Number",
      default: 6,
      minValue: 1,
      maxValue: 10,
    });

    const myBucket = new Bucket(this, "some-bucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber),
        },
      ],
    });

    new CfnOutput(this, "myBucket", {
      value: myBucket.bucketName,
    });
  }
}
