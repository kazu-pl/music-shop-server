import { GraphQLResolveInfo } from "graphql";

const checkIfGivenMemberIsQuered = (info: GraphQLResolveInfo, text: string) =>
  info!.fieldNodes[0]!.arguments![3].name.loc?.source.body.includes(text);

export default checkIfGivenMemberIsQuered;
