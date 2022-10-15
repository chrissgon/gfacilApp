interface Props {
  bg: string;
  border: string;
  text: string;
}

function getClassesFromColors(state: string | undefined = ""): Props {
  return {
    bg: `!bg-${state}-500 dark:!bg-${state}-500`,
    border: `!border-${state}-500 dark:!border-${state}-900`,
    text: `!text-${state}-500 dark:!text-${state}-500`,
  };
}

export { getClassesFromColors };
