import { Anchor, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { IpInfo } from 'src/common/type/ipInfo';

const NetInfoCard: React.FC<{ ipInfo: IpInfo; title: string }> = ({
  ipInfo,
  title,
}) => {
  return (
    <Stack gap={'xs'}>
      <Group>
        <Text size="lg" c="violet">
          {title} IP: {ipInfo.ip}
        </Text>
        <Anchor
          c={'gray'}
          href={`https://www.google.com/maps?q=${ipInfo.location.latitude},${ipInfo.location.longitude}`}
          target="_blank"
        >
          {[
            ipInfo.location.city,
            ipInfo.location.state,
            ipInfo.location.country,
          ].join(', ')}
        </Anchor>
      </Group>
      <iframe
        width="100%"
        height="240"
        frameBorder="0"
        src={`https://maps.google.com/maps?width=100%25&height=240&hl=en&q=${ipInfo.location.latitude},${ipInfo.location.longitude}&z=4&ie=UTF8&iwloc=B&output=embed`}
      >
        <a href="https://www.gps.ie/">gps devices</a>
      </iframe>
    </Stack>
  );
};

export default NetInfoCard;
