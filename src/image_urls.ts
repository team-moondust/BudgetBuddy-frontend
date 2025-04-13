export const PET_0 = {
  static: "/pets/pet0.webp",
  gif: (score: number) => `/pets/pet0_${score}.gif`,
} as const;

export const PET_1 = {
  static: "/pets/pet1.webp",
  gif: (score: number) => `/pets/pet1_${score}.gif`
} as const;
