#include <iostream>
#include <time.h>
 
using namespace std;
 
//封装页面帧
struct Tem {
	int data;
	int sign;
};
//计算缺页率
double count(double sum,int num) {
	//其中sum为缺页总次数,num为引用串页面的总数
	return sum / num * 100;//将其乘以100，得到百分比的大小
}
//FIFO页面置换算法
double fifo(int* page, Tem* tem, int num, int size) {
	//page数组表示页帧块组，tem数组表示页面引用串
	//num表示页面引用串的页面总数，size表示页面帧的数量
	int n = 0, s = 0,res,flag;
	//n用来记录已占用的页面帧的数量，s用来给页面的标志位赋值，代表来到页面帧的顺序
	//flag标志在页面帧中是否存在，1表示存在，0表示不存在;
	//res用来表示当页面帧满时，FIFO页面置换算法将要换掉的页面帧标号
	double sum = 0;//sum为缺页总数，先初始化为0
	for (int i = 0; i < num; i++) {
		flag = 0;
		//当已占用的页面帧的数量为0，不用去判断页面是否存在
		if (n == 0) {            
			tem[i].data = page[i];
			tem[i].sign = s;
			n++;
			s++;
			cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
			sum++;
		}
		else {//页面帧中已有页面存在
			//循环遍历看页面是否已存在
			for (int j = 0; j < n; j++) {
				if (tem[j].data == page[i]) {
					flag = 1;
					cout << endl << "页面" << page[i] << "已存在" << endl;
					break;
				}
			}
			//页面不在页面帧中
			if (flag == 0) {
				//判断页面帧是否还有空
				if (n < size) {  //页面帧中还有空余帧
					tem[n].data = page[i];
					tem[n].sign = s;
					n++;
					s++;
					cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
					sum++;
				}
				else {//页面帧没有空余帧，需要进行换页
					Tem* t = new Tem;
					int min=1000;
					//循环遍历页面帧中页面的标志位，标志越小表示越早到达页面帧
					for (int p = 0; p < n ; p++) {
						if (tem[p].sign < min) {
							min=tem[p].sign;
							res = p;
						}
						t = &tem[res];
					}
					cout << endl << "此时各页帧均满，换出页面" << t->data << "，并将页面" << page[i] << "放入第" << res + 1 << "个页帧中" << endl;
					sum++;
					t->data = page[i];
					t->sign = s;
					s++;
				}
			}
		}
	}
	return sum;
}
//OPT页面置换算法
double opt(int* page, Tem* tem, int num, int size) {
	//page数组表示页帧块组，tem数组表示页面引用串
	//num表示页面引用串的页面总数，size表示页面帧的数量
	int n = 0, s = 0, flag;
	//n用来记录已占用的页面帧的数量，s用来给页面的标志位赋值，代表来到页面帧的顺序
	//flag标志在页面帧中是否存在，1表示存在，0表示不存在;
	double sum = 0;
	for (int i = 0; i < num; i++) {
		//当已占用的页面帧的数量为0，不用去判断页面是否存在
		flag = 0;
		if (n == 0) {
			tem[i].data = page[i];
			n++;
			cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
			sum++;
		}
		else {//页面帧中已有页面存在
			//循环遍历看页面是否已存在
			for (int j = 0; j < n; j++) {
				if (tem[j].data == page[i]) {
					flag = 1;
					cout << endl << "页面" << page[i] << "已存在" << endl;
					break;
				}
			}
			//页面不在页面帧中
			if (flag == 0) {
				//判断页面帧是否还有空
				if (n <size) {         //页面帧中还有空余帧
					tem[n].data = page[i];
					n++;
					cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
					sum++;
				}
				else {     //页面帧没有空余帧，需要进行换页
					int ren = 0, m=0;//ren记录页面帧已满的页面后面使用的先后顺序
					for (int p = 0; p < size; p++)  //循环将页面帧中的页面标志位置为0,默认为后面未使用
						tem[p].sign = 0;
					for (int q = i + 1; q < num; q++) {
						//从当前页面后面开始循环遍历之后的页面引用串
						for (m=0; m < size; m++) {
							if (page[q] == tem[m].data&&tem[m].sign==0) {
								//比较页面串和页面帧中的数据是否相等且标志位是否为0
								tem[m].sign =1;      
								ren++;
									break;
							}
						}
						//当发现页面帧中的某个页面是页面串中将来最晚使用到的，退出循环遍历
						if (ren == size)  
							break;
					}
					//当遍历循环结束，发现页面帧中的某些页面是页面串中将来不会使用到的
					if (ren < size) {  
						//循环遍历页面帧中第一个在未来不会使用到的页面
						for (m=0; m < size; m++) {
							if (tem[m].sign ==0)
								break;
						}
					}
					cout << endl << "此时各页帧均满，换出页面" << tem[m].data << "，并将页面" << page[i] << "放入第" << m + 1 << "个页帧中" << endl;
					tem[m].data = page[i];
					sum++;
				}
			}
		}
	}
	return sum;
}
//LRU页面置换算法
double lru(int* page, Tem* tem, int num, int size){
	//page数组表示页帧块组，tem数组表示页面引用串
	//num表示页面引用串的页面总数，size表示页面帧的数量
	int n = 0, s = 0, flag;
	//n用来记录已占用的页面帧的数量，s用来给页面的标志位赋值，代表来到页面帧的顺序
	//flag标志在页面帧中是否存在，1表示存在，0表示不存在;
	double sum = 0;
	for (int i = 0; i < num; i++) {
		//当已占用的页面帧的数量为0，不用去判断页面是否存在
		flag = 0;
		if (n == 0) {
			tem[i].data = page[i];
			n++;
			cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
			sum++;
		}
		else {//页面帧中已有页面存在
			//循环遍历看页面是否已存在
			for (int j = 0; j < n; j++) {
				if (tem[j].data == page[i]) {
					flag = 1;
					cout << endl << "页面" << page[i] << "已存在" << endl;
					break;
				}
			}
			//页面不在页面帧中
			if (flag == 0) {
				//判断页面帧是否还有空
				if (n < size) {         //页面帧中还有空余帧
					tem[n].data = page[i];
					n++;
					cout << endl << "此时存在一些页帧为空,页面" << page[i] << "放入第" << n << "个页帧中" << endl;
					sum++;
				}
				else {      //页面帧没有空余帧，需要进行换
					int ren = 0, m;
					for (int p = 0; p < size; p++)    //循环将页面帧中的页面标志位置为0,默认为前面未使用
						tem[p].sign = 0;
					//从当前页面前面开始循环遍历之前的页面引用串
					for (int q = i - 1; q >= 0; q--) {
						for (m = 0; m < size; m++) {
							//比较页面串和页面帧中的数据是否相等且标志位是否为0
							if (page[q] == tem[m].data && tem[m].sign == 0) {
								tem[m].sign = 1;
								ren++;
								break;
							}
						}
						//当发现页面帧中的某个页面是页面串之前最早使用到的，退出循环遍历
						if (ren == size)
							break;
					}
					//当遍历循环结束，发现页面帧中的某些页面是页面串中之前没有使用到的
				if (ren < size) {
						//循环遍历页面帧中第一个在之前没有使用到的页面
						for (m = 0; m < size; m++) {
							if (tem[m].sign == 0)
								break;
						}
					}
					cout << endl << "此时各页帧均满，换出页面" << tem[m].data << "，并将页面" << page[i] << "放入第" << m + 1 << "个页帧中" << endl;
					tem[m].data = page[i];
					sum++;
				}
			}
		}
	}
	return sum;
}
 
int main() {
	int num, size;
	double sum, percent;
	cout << "请输入页面应用串的大小：";
	cin >> num;
	int page[30];
	Tem tem[7];
	srand((unsigned int)time(NULL));
	for (int i = 0; i < num; i++) {
		page[i] = rand() % 10;
	}
	cout << "随机产生的页面引用串为：";
	for (int i = 0; i < num; i++)
		cout << page[i] << " ";
	cout <<endl<< "页帧数为：";
	cin >> size;
	cout << endl << "*****************FIFO页面置换算法******************" << endl;
	sum=fifo(page, tem, num, size);
	cout << endl << "缺页次数为：" << sum << endl;
	cout << endl << "缺页率为：" << count(sum, num) <<"%"<< endl;
	cout << endl << "*****************OPT页面置换算法******************" << endl;
	sum = opt(page, tem, num, size);
	cout << endl << "缺页次数为：" << sum << endl;
	cout << endl << "缺页率为：" << count(sum, num) << "%" << endl;
	cout << endl << "*****************LRU页面置换算法******************" << endl;
	sum = lru(page, tem, num, size);
	cout << endl << "缺页次数为：" << sum << endl;
	cout << endl << "缺页率为：" << count(sum, num) << "%" << endl;
	return 0;
}