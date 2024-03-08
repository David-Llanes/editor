import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Fundas para celular",
    description: "Apple, Samsung, Huawei, Oppo y muchos más.",
    image: "/assets/mocks/funda.png",
  },
  {
    id: 2,
    title: "Mousepads",
    description: "19 x 20cm, 3mm de grosor y base antideslizante.",
    image: "/assets/mocks/mousepad.webp",
  },
  {
    id: 3,
    title: "Tazas",
    description: "Cerámica de alta calidad, 325ml de capacidad.",
    image: "/assets/mocks/tazas.png",
  },
  {
    id: 4,
    title: "Playeras",
    description: "100% algodón, tallas desde XS hasta 3XL.",
    image: "/assets/mocks/playera.png",
  },
];

export default function Cards() {
  return cards.map((card) => (
    <Card className="row-span-2 grid grid-rows-subgrid gap-2" key={card.id}>
      <CardHeader className="pb-2">
        <CardTitle>{card.title}</CardTitle>
        <CardDescription className="">{card.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex items-center justify-center">
        <Image
          src={card.image}
          alt="Mockup"
          width={200}
          height={200}
          className="h-full w-full rounded-md object-contain"
        />
      </CardContent>
    </Card>
  ));
}
