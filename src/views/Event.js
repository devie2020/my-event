import Event from '@/lib/event';

// 实例化事件对象
const event = new Event();

event.on('listen', res => {
	console.log('listen::', res);
});

event.emit('listen', [1, 2, 3]);
event.emit('listen', { name: 'zhangsan' });
