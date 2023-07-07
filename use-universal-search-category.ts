import { TranslationFunction } from "@app/utils/i18n/utils/types"
import { useEffect, useState } from "react"

export type SearchFilterInputsTypes = Array<
  | "Member"
  | "Role"
  | "User"
  | "AccessPassProduct"
  | "BasicProduct"
  | "RegularServiceProduct"
  | "CustomOfferProduct"
  | "EventProduct"
  | "GiftCardProduct"
  | "Schedule"
  | "Resource"
  | "Area"
  | "Order"
  | "ManualBlocker"
>

export interface SearchCategory {
  name: "All" | "Team" | "Products" | "Schedules" | "Facilities" | "Orders"
  active: boolean
  searchFilterInputs: SearchFilterInputsTypes
}

const CATEGORIES: SearchCategory[] = [
  {
    name: "All",
    active: true,
    searchFilterInputs: [],
  },
  {
    name: "Team",
    active: false,
    searchFilterInputs: ["Member", "Role", "User"],
  },
  {
    name: "Products",
    active: false,
    searchFilterInputs: [
      "AccessPassProduct",
      "BasicProduct",
      "RegularServiceProduct",
      "CustomOfferProduct",
      "EventProduct",
      "GiftCardProduct",
    ],
  },
  {
    name: "Schedules",
    active: false,
    searchFilterInputs: ["Schedule"],
  },
  {
    name: "Facilities",
    active: false,
    searchFilterInputs: ["Resource", "Area"],
  },
  {
    name: "Orders",
    active: false,
    searchFilterInputs: ["Order"],
  },
]

export const useUniversalSearchCategories = () => {
  const [categories, setCategories] = useState<SearchCategory[]>(CATEGORIES)
  const [activeSearchFilters, setActiveSearchFilters] =
    useState<SearchFilterInputsTypes>([])
  const [isAllActive, setIsAllActive] = useState<boolean>(true)

  useEffect(() => {
    const activeCategories = categories.filter((category) => category.active)
    const searchFiltersActive: SearchFilterInputsTypes = []

    activeCategories.forEach((category) => {
      searchFiltersActive.push(...category.searchFilterInputs)
    })

    setActiveSearchFilters(searchFiltersActive)
  }, [categories])

  const toggleIsAllActive = () => {
    if (!isAllActive) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === "All"
            ? { ...category, active: true }
            : { ...category, active: false }
        )
      )
    } else {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === "All" ? { ...category, active: false } : category
        )
      )
    }
    setIsAllActive((prevValue) => !prevValue)
  }

  const toggleCategory = (categoryName: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === categoryName
          ? { ...category, active: !category.active }
          : category
      )
    )
  }

  const getCategory = (categoryName: string) => {
    return categories.find((category) => category.name === categoryName)
  }

  return {
    categories,
    activeSearchFilters,
    toggleCategory,
    getCategory,
    isAllActive,
    toggleIsAllActive,
  }
}

export function translateUniversalSearchCategory(
  category: SearchCategory["name"],
  t: TranslationFunction
) {
  switch (category) {
    case "All":
      return t("universalSearchCategory.all", { defaultValue: "All" })
    case "Facilities":
      return t("universalSearchCategory.facilities", {
        defaultValue: "Facilities",
      })
    case "Orders":
      return t("universalSearchCategory.orders", { defaultValue: "Orders" })
    case "Products":
      return t("universalSearchCategory.products", { defaultValue: "Products" })
    case "Schedules":
      return t("universalSearchCategory.schedules", {
        defaultValue: "Schedules",
      })
    case "Team":
      return t("universalSearchCategory.team", { defaultValue: "Team" })

    default:
      return ""
  }
}

