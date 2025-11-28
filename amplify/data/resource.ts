import { defineData, type ClientSchema } from '@aws-amplify/backend'

const schema = /* GraphQL */ `
  type FailedGeneration @model @auth(rules: [{ allow: groups, groups: ["Admins"] }]) {
    id: ID!
    poseName: String!
    errorMessage: String!
    errorType: String
    stepFunctionExecutionId: String
    failedAt: AWSDateTime!
    retryCount: Int
  }
` as const

// @ts-ignore
export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
