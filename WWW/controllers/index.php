<?php

namespace hsC;

class index
{

	public function index()
	{
		#exit(jsonCode('ok', 'api 1.0.1...'));

		/* 获取客户端的ip地址 */
		#$ip = \hsTool\ip::getIp();
		#echo $ip;

		exit(jsonCode('ok', 'api 1.0.1'));
	}
}
