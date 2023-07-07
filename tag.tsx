import { XIcon } from "@ticketbro/design-system/icons"
import { StyleProp, ViewStyle } from "react-native"
import { useTailwindStyles } from "react-native-tailwind.macro"
import { Icon, SvgIcon } from "../icon"
import { IconButton } from "../icon-button"
import { AdvancedTouchable } from "../touchable"
import { Typography } from "../typography"
import { AdvancedView } from "../view"

export type TagColor = "blue" | "black" | "green" | "yellow" | "red"

export type TagSize = "default" | "small"

export interface TagProps {
  color?: TagColor
  icon?: SvgIcon
  label: string
  active?: boolean
  size?: TagSize
  disabled?: boolean
  leftChild?: React.ReactNode
  onPress?: () => void
  onPressClose?: () => void
  style?: StyleProp<ViewStyle>
  dataSet?: JSX.IntrinsicAttributes["dataSet"]
}

export const Tag = ({
  color = "blue",
  icon,
  label,
  active,
  disabled,
  size = "default",
  leftChild,
  onPress,
  onPressClose,
  style,
  dataSet,
}: TagProps) => {
  const styles = useTailwindStyles((tw) => {
    return {
      container: tw`flex-row items-center justify-center py-1 rounded-lg`,
      closeIconSize: {
        default: tw`w-4 h-4`,
        small: tw`w-3 h-3`,
      },
      typography: tw`font-medium flex-shrink-1`,
      typographyFontSize: {
        default: tw`text-sm`,
        small: tw`text-xs`,
      },
      typographyLeftMargin: {
        default: tw`ml-2`,
        small: {
          withLeftIcon: tw`ml-1`,
          withoutLeftIcon: tw`ml-[6px]`,
        },
      },
      typographyRightMargin: {
        default: tw`mr-2`,
        small: {
          withCloseIcon: tw`mr-1`,
          withoutCloseIcon: tw`mr-[6px]`,
        },
      },
      avatar: tw`ml-1`,
      closeIcon: {
        default: { marginLarge: tw`mr-2`, marginSmall: tw`mr-1` },
        small: tw`mr-1`,
      },
      leftIcon: {
        default: tw`ml-2`,
        small: tw`ml-[6px]`,
      },
      leftIconSize: {
        default: tw`w-4 h-4`,
        small: tw`w-[14px] h-[14px]`,
      },
      color: {
        blue: {
          bg: {
            default: tw`bg-primary-100 dark:bg-primary-800`,
            active: tw`bg-primary-500 dark:bg-primary-400`,
          },
          text: {
            default: tw`text-primary-500 dark:text-primary-300`,
            active: tw`text-white dark:text-white`,
          },
          closeIcon: {
            default: tw`text-primary-300 dark:text-primary-400`,
            active: tw`text-primary-200 dark:text-primary-200`,
          },
        },

        red: {
          bg: {
            default: tw`bg-red-100 dark:bg-red-800`,
            active: tw`bg-red-500 dark:bg-red-400`,
          },
          text: {
            default: tw`text-red-600 dark:text-red-200`,
            active: tw`text-white dark:text-white`,
          },
          closeIcon: {
            default: tw`text-red-400 dark:text-red-300`,
            active: tw`text-red-200 dark:text-red-200`,
          },
        },
        yellow: {
          bg: {
            default: tw`bg-yellow-100 dark:bg-yellow-800`,
            active: tw`bg-yellow-500 dark:bg-yellow-500`,
          },
          text: {
            active: tw`text-white dark:text-white`,
            default: tw`text-yellow-600 dark:text-yellow-200`,
          },
          closeIcon: {
            active: tw`text-yellow-200 dark:text-yellow-200`,
            default: tw`text-yellow-400 dark:text-yellow-300`,
          },
        },
        green: {
          bg: {
            default: tw`bg-green-100 dark:bg-green-800`,
            active: tw`bg-green-500 dark:bg-green-500`,
          },
          text: {
            active: tw`text-white dark:text-white`,
            default: tw`text-green-600 dark:text-green-200`,
          },
          closeIcon: {
            active: tw`text-green-200 dark:text-green-200`,
            default: tw`text-green-400 dark:text-green-300`,
          },
        },
        black: {
          bg: {
            active: tw`bg-bluegray-700 dark:bg-bluegray-100`,
            default: tw`bg-bluegray-100 dark:bg-bluegray-700`,
          },
          text: {
            active: tw`text-white dark:text-bluegray-700`,
            default: tw`text-bluegray-700 dark:text-white`,
          },
          closeIcon: {
            active: tw`text-bluegray-200 dark:text-bluegray-400`,
            default: tw`text-bluegray-400 dark:text-bluegray-400`,
          },
        },
      },
    }
  })

  const content = (
    <>
      {icon && (
        <Icon
          icon={icon}
          style={[styles.leftIcon[size], styles.leftIconSize[size]]}
          stateStyleSet={styles.color[color].text}
          stateMap={{ active }}
        />
      )}

      {leftChild}

      <Typography
        style={[
          styles.typography,
          styles.typographyFontSize[size],
          size === "default"
            ? styles.typographyLeftMargin[size]
            : styles.typographyLeftMargin[size][
                icon ? "withLeftIcon" : "withoutLeftIcon"
              ],
          size === "default"
            ? styles.typographyRightMargin[size]
            : styles.typographyRightMargin[size][
                onPressClose ? "withCloseIcon" : "withoutCloseIcon"
              ],
        ]}
        stateStyleSet={styles.color[color].text}
        stateMap={{ active }}
      >
        {label}
      </Typography>

      {onPressClose && (
        <IconButton
          icon={XIcon}
          style={[
            size === "default"
              ? styles.closeIcon[size][icon ? "marginLarge" : "marginSmall"]
              : styles.closeIcon[size],
            styles.closeIconSize[size],
          ]}
          stateStyleSet={styles.color[color].closeIcon}
          stateMap={{ active }}
          onPress={onPressClose}
        />
      )}
    </>
  )

  if (!onPress)
    return (
      <AdvancedView
        style={[styles.container, { opacity: disabled ? 0.3 : 1 }, style]}
        stateStyleSet={styles.color[color].bg}
        dataSet={dataSet}
        active={active}
      >
        {content}
      </AdvancedView>
    )

  return (
    <AdvancedTouchable
      onPress={onPress}
      style={[styles.container, { opacity: disabled ? 0.3 : 1 }, style]}
      stateStyleSet={styles.color[color].bg}
      dataSet={dataSet}
      disabled={disabled || !onPress}
      active={active}
    >
      {content}
    </AdvancedTouchable>
  )
}

