// https://nuxt.com/docs/getting-started/data-fetching#minimize-payload-size

import { Mountain } from "@/types"

export const mountains: Mountain[] = [
  {
    id: 1,
    title: "everest",
    description: "Earth's highest mountain above sea level.",
    location: "The China-Nepal border",
    elevation: 8848.86,
  },
  {
    id: 2,
    title: "k2",
    description: "K2 stands for Karakorum No.2, or Karakorum Range Survey Number 2.",
    location: "The Pakistan-China border",
    elevation: 8611,
  },
  {
    id: 3,
    title: "Kangchenjunga",
    description: "Means 'five treasures of great snow' in Tibetan",
    location: "The Nepal-India border",
    elevation: 8586,
  },
  {
    id: 4,
    title: "Mt. Teine",
    description: "The mountaintop is lined with television transmission stations.",
    location: "Sapporo City, Hokkaido, Japan",
    elevation: 1023.1,
  },
]
