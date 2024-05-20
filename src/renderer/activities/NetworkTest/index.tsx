import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Stack, Text } from '@mantine/core';
import { IpInfo } from 'src/common/type/ipInfo';
import { getClientIpInfo, getServerIpInfo } from './request';
import NetInfoCard from './NetInfoCard';

const NetworkTest: React.FC<{}> = () => {
  const [value, setValue] = useState<{
    clientIpInfo: IpInfo;
    serverIpInfo: IpInfo;
  } | null>(null);
  const getNetInfo = useCallback(async () => {
    const clientIpInfo = await getClientIpInfo();
    const serverIpInfo = await getServerIpInfo();
    setValue({ clientIpInfo, serverIpInfo });
  }, []);
  useEffect(() => {
    getNetInfo();
  }, [getNetInfo]);
  return (
    <>
      <Text c={'gray'}>
        Test network connection for both client and server.
      </Text>
      <Stack gap={'xl'} mt={'lg'}>
        {value?.clientIpInfo ? (
          <NetInfoCard ipInfo={value.clientIpInfo} title="Client" />
        ) : (
          <Text>Testing client network connection...</Text>
        )}
        <Divider />
        {value?.serverIpInfo ? (
          <NetInfoCard ipInfo={value.serverIpInfo} title="Server" />
        ) : (
          <Text>Testing server network connection...</Text>
        )}
      </Stack>
    </>
  );
};

export default NetworkTest;
