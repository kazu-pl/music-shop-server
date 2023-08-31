import { GraphQLResolveInfo } from "graphql";

/**
 * This function is to check if client queried specifid field. It seraches for that field in info object. This function can be used to check if some field like filter is queried (a field wich only passed `id` of the filter to `guitar` model). If indeed a field was quered it can be later on populated (so mongoDB client will populate its data and WON'T if a field wasn't queried)
 */
const checkIfGivenMemberIsQuered = (info: GraphQLResolveInfo, text: string) =>
  info!.fieldNodes[0]!.arguments![3].name.loc?.source.body.includes(text);

export default checkIfGivenMemberIsQuered;
