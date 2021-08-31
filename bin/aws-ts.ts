#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsTsStack } from "../lib/aws-ts-stack";

const app = new cdk.App();
new AwsTsStack(app, "AwsTsStack", {});
