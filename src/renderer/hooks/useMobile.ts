import { em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useMobile() {
  const isMobile = useMediaQuery(
    `(max-width: ${em(980)})`,
    document.body.clientWidth < 980
  );
  return isMobile;
}
