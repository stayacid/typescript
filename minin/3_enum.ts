enum Membership {
  Simple,
  Standart,
  Premium
}

const membership = Membership.Standart
console.log(membership);

const membershipReverse = Membership[2]  // get text content of enum
console.log(membershipReverse);

// enum with string value
enum SocialMedia {
  VK = 'Vkontakte',
  FB = 'Facebook',
  IN = 'Instagram'
}

const social = SocialMedia.FB
console.log(social);