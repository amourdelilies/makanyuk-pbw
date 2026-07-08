import {
  ChefHat,
  Heart,
  Trophy,
  Star,
} from "lucide-react";

export const activities = [
  {
    id: 1,
    icon: ChefHat,
    color: "bg-green-100",
    iconColor: "text-green-700",
    title: "Published a new recipe",
    subtitle: "Nasi Goreng Kampung",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: Trophy,
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "Completed Daily Quest",
    subtitle: "+50 XP Earned",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: Heart,
    color: "bg-red-100",
    iconColor: "text-red-500",
    title: "Liked a recipe",
    subtitle: "Healthy Chicken Salad",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: Star,
    color: "bg-yellow-100",
    iconColor: "text-yellow-500",
    title: "Reached Cooking Level 14",
    subtitle: "Congratulations!",
    time: "Yesterday",
  },
];