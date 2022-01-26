import ky from 'ky';
import { useAuth } from '../components/Login/AuthProvider';

const useExtendedKy = () => {
	const {token} = useAuth()


	const api = ky.extend({
		hooks: {
			beforeRequest: [
				request => {
					request.headers.set('Authorization', `Bearer ${token}`);
					request.headers.set('Content-Type', 'application/json')
				}
			]
		}
	});
	
	return api
}
export default useExtendedKy