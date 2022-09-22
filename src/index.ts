import { Ability, AbilityBuilder } from "@casl/ability";

const defineAbility = () => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  can("read", "Posts");

  return build();
};

const ability = defineAbility();

const canReadPosts = ability.can("read", "Posts");
const canWatchVideos = ability.can("read", "Videos");

console.log("canReadPosts =======> ", canReadPosts);
console.log("canWatchVideos =======> ", canWatchVideos);
