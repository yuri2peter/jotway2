import { IpInfoSchema } from 'src/common/type/ipInfo';
import { api } from 'src/renderer/helpers/api';

export async function getClientIpInfo() {
  const res = await fetch('https://api.ipapi.is');
  const data = await res.json();
  return IpInfoSchema.parse(data);
}

export async function getServerIpInfo() {
  const { data } = await api().post('/api/miscs/get-server-ip-info');
  return IpInfoSchema.parse(data);
}
