import { Ability, AbilityBuilder } from "@casl/ability";

import { AbilityAction } from "./AbilityAction";
import { AbilitySubject } from "./AbilitySubject";

const defineAbility = () => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  can(AbilityAction.Read, AbilitySubject.Posts);

  return build();
};

const ability = defineAbility();

const canReadPosts = ability.can(AbilityAction.Read, AbilitySubject.Posts);
const canWatchVideos = ability.can(AbilityAction.Read, AbilitySubject.Videos);

console.log("canReadPosts =======> ", canReadPosts);
console.log("canWatchVideos =======> ", canWatchVideos);
