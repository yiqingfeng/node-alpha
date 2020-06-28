/**
 * @description https 证书
 * @date 2020-06-24
 */
import fs from 'fs';
import path from 'path';

const ECA = {
	key: `
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIL3YmpgYcS0X0eOJW15o/qU313OO+4afrv+3PPFldsYSoAoGCCqGSM49
AwEHoUQDQgAEIInaRklOq9t2S8WqpObMEEuLUCwA5rfVyZToN8tfZPZYo32an2KI
CPlSo5UPGyAChkRVEd+QpdzogZx9f6Gadw==
-----END EC PRIVATE KEY-----
	`.trim(),
	cert: `
-----BEGIN CERTIFICATE-----
MIIBIzCByqADAgECAgkA/CiFXA1iHGswCgYIKoZIzj0EAwIwDTELMAkGA1UEAwwC
RkUwHhcNMjAwMjAyMDMxNDA3WhcNMzgwMTE5MDMxNDA3WjANMQswCQYDVQQDDAJG
RTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABCCJ2kZJTqvbdkvFqqTmzBBLi1As
AOa31cmU6DfLX2T2WKN9mp9iiAj5UqOVDxsgAoZEVRHfkKXc6IGcfX+hmnejEzAR
MA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIgLqmZL7THLn+19GtA
fKG851Tpc/FDmEs3o5HRHg8KHskCIQCu/D9eKbhJY7XrdeUBnLuLkcpYxe738737
GLnpgwVWiA==
-----END CERTIFICATE-----
	`.trim(),
};

const APP = {
	key: `
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIK9PFH3r6ocyQu0wcmRdpNb7Y8Dmafyv0tTdGYn7YLLvoAoGCCqGSM49
AwEHoUQDQgAEWZ6nZN2XUQ+rcvQPmunMdAO5xaHYwGM/oDy04Yi+cFSTsxHRqoci
d2zzCq4BcSjFFhSjIg8/sjwK7sHhb4rfdw==
-----END EC PRIVATE KEY-----
	`.trim(),
	cert: `
-----BEGIN CERTIFICATE-----
MIIBfzCCASSgAwIBAgIJAPZ6/aYjRAizMAoGCCqGSM49BAMCMA0xCzAJBgNVBAMM
AkZFMB4XDTIwMDIwMjAzMTQwN1oXDTIyMDUwNzAzMTQwN1owETEPMA0GA1UEAwwG
ZmUuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWZ6nZN2XUQ+rcvQPmunM
dAO5xaHYwGM/oDy04Yi+cFSTsxHRqocid2zzCq4BcSjFFhSjIg8/sjwK7sHhb4rf
d6NpMGcwCQYDVR0TBAIwADBaBgNVHREEUzBRgggqLmZlLmNvbYIOKi5jZXNoaTEx
My5jb22CDiouY2VzaGkxMTIuY29tgg0qLmZ4aWFva2UuY29thwR/AAABhxAAAAAA
AAAAAAAAAAAAAAABMAoGCCqGSM49BAMCA0kAMEYCIQCvuEDjfgGB9QAs0c5fh2IY
F1bfY6QSRgwqQKyyei+YewIhANuPlBN2Dkxxsua5CebPwtVFpt01QvgiP/C2hvY/
t2dB
-----END CERTIFICATE-----
	`.trim(),
};

/**
 * @description 注册 hosts 文件
 * @param {string} domain 域名 
 */
function registerHosts(domain: string) {
	let hostsPath = '/etc/hosts'; // hosts 文件地址

}

interface Cert {
	cert: string | undefined; // 公钥
	key: string | undefined; // 私钥
}

/**
 * @description 导出根证书
 */
function exportCert(fileName: string = 'cert.crt', cert: Cert = {
	cert: ECA.cert,
	key: undefined,
}) {
	function getPath(name: string): string {
		return path.join(__dirname, '../../', name);
	}

	if (cert.cert) {
		// utils.writeFstr([__dirname, fileName], cert.cert);
	}
	if (cert.key) {
		const keyName = fileName.replace(/(\.[^.]+$)|($)/, '.key');
		// utils.writeFstr([__dirname, keyName], cert.key);
	}
	const certPath = path.join(__dirname, '../../', fileName);
	// cert.cert && utils.writeFstr([__dirname, fileName], cert.cert);
	// cert.key && utils.writeFstr([__dirname, keyName], cert.key);
}

export default {
	app: {
		key: APP.key,
		cert: APP.cert,
	},
	registerHosts,
	export: exportCert,
}
