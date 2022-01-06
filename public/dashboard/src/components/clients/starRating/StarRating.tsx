import Icon from "@chakra-ui/icon";
import React from "react";
import { IconType } from "react-icons";
import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";

function StarRating({
  starCount = 5,
  rating,
}: {
  starCount?: number;
  rating: number;
}) {

  const addStar = (item: any, index: number) => {
    let icon : IconType
    
    if (index > rating) {
      icon = FaRegStar
    } 
    else if (index > rating - 1 && index < rating) {
        icon = FaStarHalfAlt
    }
    else { 
        icon = FaStar
    }
    return <Icon as={icon} role="presentation"/>
  }


  return <>{[...Array(5)].map(addStar)}</>;
}

export default StarRating;
