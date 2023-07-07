import { ErrorBoundary, useI18n } from "@app/utils"
import {
  BlurView,
  IconButton,
  motiAppear,
  Overlay,
  SearchBar,
  Typography,
  useHotKey,
  XIcon,
} from "@ticketbro/design-system"
import { AnimatePresence, MotiView } from "moti"
import React, { Suspense, useState, useEffect, useRef } from "react"
import { View, TextInput, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import "react-native-tailwind.macro"
import { useUniversalSearch } from "../utils/use-universal-search"
import { useUniversalSearchCategories } from "../utils/use-universal-search-category"
import { SearchResultList } from "./search-result-list"
import {
  UniversalSearchCategoryMenu,
  UniversalSearchCategoryScroll,
} from "./search-category"
import { SearchSkeleton } from "./search-result/search-skeleton"
import { UniversalSearchErrorFallback } from "./universal-search-error-fallback"

export interface UniversalSearchModalProps {}

export const UniversalSearchModal = ({}: UniversalSearchModalProps) => {
  const { t } = useI18n()
  const { top } = useSafeAreaInsets()
  const searchBarRef = useRef<TextInput>(null)
  const { searchIsActive, hideUniversalSearch } = useUniversalSearch()
  const {
    categories,
    toggleCategory,
    activeSearchFilters,
    isAllActive,
    toggleIsAllActive,
  } = useUniversalSearchCategories()
  const [searchPrompt, setSearchPrompt] = useState("")

  useEffect(() => {
    searchBarRef.current?.focus()

    const listener = (e: KeyboardEvent) => {
      if (!searchIsActive) return
      if (e.code === "Escape") hideUniversalSearch()
    }

    if (Platform.OS === "web" && typeof window !== "undefined") {
      const searchInput = document.getElementById("UniversalSearchBar")
      searchInput?.addEventListener("keydown", listener)
    }
    return () => {
      if (Platform.OS === "web" && typeof window !== "undefined") {
        const searchInput = document.getElementById("UniversalSearchBar")
        searchInput?.removeEventListener("keydown", listener)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchIsActive])

  useHotKey(() => {
    if (searchIsActive) hideUniversalSearch()
  }, "Escape")

  if (!searchIsActive) return null

  return (
    <>
      <Overlay onPress={hideUniversalSearch} opacity={70} />
      <AnimatePresence>
        <MotiView
          {...motiAppear}
          pointerEvents="box-none"
          tw="absolute-fill md:items-center md:justify-start md:py-30"
        >
          <BlurView
            blur={Platform.OS === "web" ? "none" : "large"}
            tw="flex-1 md:flex-initial md:min-h-[50%] bg-bluegray-700/80 web:bg-bluegray-700 dark:bg-bluegray-900/50 web:dark:bg-bluegray-900 md:w-full md:max-w-[680px] md:rounded-3xl"
          >
            <View
              style={{
                flexDirection: "row",
                paddingTop: 22 + top,
                alignItems: "center",
                paddingHorizontal: 24,
              }}
            >
              <View tw="w-6" />
              <Typography tw="flex-1 font-semibold text-lg text-white text-center dark:text-white mx-2">
                {t("universalSearch.searchModal.title", {
                  defaultValue: "Search",
                })}
              </Typography>
              <IconButton
                tw="w-6 h-6 text-white dark:text-white"
                icon={XIcon}
                onPress={hideUniversalSearch}
              />
            </View>

            <SearchBar
              nativeID="UniversalSearchBar"
              ref={searchBarRef}
              tw="mt-[30px] mx-6"
              alwaysLight
              size="large"
              searchKey={searchPrompt}
              onChangeText={(k) => setSearchPrompt(k)}
              onClear={() => setSearchPrompt("")}
            />
            {searchPrompt.length > 0 ? (
              <UniversalSearchCategoryScroll
                tw="mx-6 mt-3"
                categories={categories}
                toggleCategory={toggleCategory}
                isAllActive={isAllActive}
                toggleIsAllActive={toggleIsAllActive}
              />
            ) : (
              <UniversalSearchCategoryMenu
                tw="mx-6 mt-3"
                categories={categories}
                toggleCategory={toggleCategory}
                isAllActive={isAllActive}
                toggleIsAllActive={toggleIsAllActive}
              />
            )}
            <ErrorBoundary fallback={UniversalSearchErrorFallback}>
              <Suspense fallback={<SearchSkeleton />}>
                <SearchResultList
                  searchTerm={searchPrompt}
                  activeSearchFilters={activeSearchFilters}
                />
              </Suspense>
            </ErrorBoundary>
          </BlurView>
        </MotiView>
      </AnimatePresence>
    </>
  )
}

