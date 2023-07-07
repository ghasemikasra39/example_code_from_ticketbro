import React from "react"
import "react-native-tailwind.macro"
import { View, StyleProp, ViewStyle } from "react-native"
import {
  Typography,
  Icon,
  SvgIcon,
  HelpCircleIcon,
} from "@ticketbro/design-system"

export interface InfoBoxProps {
  variant?: "blue" | "green" | "yellow" | "red" | "bluegray"
  text?: string
  icon?: SvgIcon
  leftChild?: React.ReactNode
  style?: StyleProp<ViewStyle>
  dataSet?: JSX.IntrinsicAttributes["dataSet"]
}

export const InfoBox = ({
  variant = "blue",
  text = "Placeholder text",
  icon = HelpCircleIcon,
  leftChild,
  style,
  dataSet,
}: InfoBoxProps) => {
  return (
    <View style={[{ minHeight: 64 }, style]} dataSet={dataSet}>
      {variant === "blue" && (
        <View tw="flex-1 p-5 rounded-xl bg-primary-50 dark:bg-primary-900 flex-row items-center">
          {!leftChild && (
            <Icon
              icon={icon}
              tw="w-6 h-6 text-primary-500 dark:text-primary-400"
            />
          )}
          {leftChild}
          <Typography
            tw="flex-shrink text-sm font-regular ml-5 text-bluegray-700 dark:text-white "
            multiline
          >
            {text}
          </Typography>
        </View>
      )}
      {variant === "green" && (
        <View tw="flex-1 p-5 rounded-xl flex-row items-center bg-green-50 dark:bg-green-900">
          {!leftChild && (
            <Icon icon={icon} tw="w-6 h-6 text-green-500 dark:text-green-400" />
          )}
          {leftChild}
          <Typography
            tw="flex-shrink text-sm font-regular ml-5 text-bluegray-700 dark:text-white "
            multiline
          >
            {text}
          </Typography>
        </View>
      )}
      {variant === "yellow" && (
        <View tw="flex-1 p-5 rounded-xl flex-row items-center bg-yellow-50 dark:bg-yellow-900">
          {!leftChild && (
            <Icon
              icon={icon}
              tw="w-6 h-6 text-yellow-500 dark:text-yellow-400"
            />
          )}
          {leftChild}
          <Typography
            tw="flex-shrink text-sm font-regular ml-5 text-bluegray-700 dark:text-white "
            multiline
          >
            {text}
          </Typography>
        </View>
      )}
      {variant === "red" && (
        <View tw="flex-1 p-5 rounded-xl flex-row items-center bg-red-50 dark:bg-red-900">
          {!leftChild && (
            <Icon icon={icon} tw="w-6 h-6 text-red-500 dark:text-red-400" />
          )}
          {leftChild}
          <Typography
            tw="flex-shrink text-sm font-regular ml-5 text-bluegray-700 dark:text-white "
            multiline
          >
            {text}
          </Typography>
        </View>
      )}
      {variant === "bluegray" && (
        <View tw="flex-1 p-5 rounded-xl flex-row items-center bg-bluegray-50 dark:bg-bluegray-900">
          {!leftChild && (
            <Icon
              icon={icon}
              tw="w-6 h-6 text-bluegray-500 dark:text-bluegray-400"
            />
          )}
          {leftChild}
          <Typography
            tw="flex-shrink text-sm font-regular ml-5 text-bluegray-700 dark:text-white "
            multiline
          >
            {text}
          </Typography>
        </View>
      )}
    </View>
  )
}

