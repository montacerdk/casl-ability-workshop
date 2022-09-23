import { Ability, AbilityBuilder, subject } from "@casl/ability";

import { AbilityAction } from "./AbilityAction";
import { AbilitySubject } from "./AbilitySubject";

type User = {
  id: string;
  fullName: string;
  isAdmin?: boolean;
  isManager?: boolean;
  isGuest?: boolean;
};

const defineAbility = (user: User) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can(AbilityAction.Manage, AbilitySubject.All);
  }

  if (user.isManager) {
    can(AbilityAction.Manage, AbilitySubject.Posts);
    can(AbilityAction.Manage, AbilitySubject.Comments);
    can(AbilityAction.Manage, AbilitySubject.Videos);

    cannot(AbilityAction.Manage, AbilitySubject.Users);
  }

  if (user.isGuest) {
    can(AbilityAction.Update, AbilitySubject.Posts, { authorId: user.id });
    can(AbilityAction.ReadAll, AbilitySubject.Users);
    can(AbilityAction.ReadAll, AbilitySubject.Comments);
    can(AbilityAction.ReadAll, AbilitySubject.Videos);
  }

  return build();
};

class Post {
  public authorId: string;

  constructor(authorId: string) {
    this.authorId = authorId;
  }
}

const randomPost = new Post("2222");

const user: User = {
  id: "1111",
  fullName: "John Doe",
  isGuest: true,
};

const ability = defineAbility(user);

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
const canUpdatePosts = ability.can(
  AbilityAction.Update,
  subject(AbilitySubject.Posts, randomPost)
);

console.log("canReadAllPosts =======> ", canReadAllPosts);
console.log("canDeleteVideos =======> ", canDeleteVideos);
console.log("canWatchAllVideos =======> ", canWatchAllVideos);
console.log("canUpdatePosts =======> ", canUpdatePosts);
