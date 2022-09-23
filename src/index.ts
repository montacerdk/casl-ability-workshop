import { Ability, AbilityBuilder } from "@casl/ability";

import { AbilityAction } from "./AbilityAction";
import { AbilitySubject } from "./AbilitySubject";

const defineAbility = () => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  const isManager = false;
  const isGuest = true;

  if (isManager) {
    can(AbilityAction.Manage, AbilitySubject.Posts);
    can(AbilityAction.Manage, AbilitySubject.Comments);
    can(AbilityAction.Manage, AbilitySubject.Users);
    can(AbilityAction.Manage, AbilitySubject.Videos);
  }

  if (isGuest) {
    can(AbilityAction.ReadAll, AbilitySubject.Posts);
    can(AbilityAction.ReadAll, AbilitySubject.Users);
    can(AbilityAction.ReadAll, AbilitySubject.Comments);
    can(AbilityAction.ReadAll, AbilitySubject.Videos);
  }

  return build();
};

const ability = defineAbility();

const canReadAllPosts = ability.can(
  AbilityAction.ReadAll,
  AbilitySubject.Posts
);
const canWatchAllVideos = ability.can(
  AbilityAction.ReadAll,
  AbilitySubject.Videos
);
const canDeleteVideos = ability.can(
  AbilityAction.Delete,
  AbilitySubject.Videos
);

console.log("canReadAllPosts =======> ", canReadAllPosts);
console.log("canDeleteVideos =======> ", canDeleteVideos);
console.log("canWatchAllVideos =======> ", canWatchAllVideos);
