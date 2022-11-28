import { GetServerSidePropsContext } from 'next';
import { CsrfRequest, CsrfResponse } from '../utils/csrf';

export type GetServerSidePropsContextWithCsrf = GetServerSidePropsContext & {
	req: CsrfRequest & { csrfToken: () => string };
	res: CsrfResponse;
}
