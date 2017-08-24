/**
 * loading mock data template
 * author: Broccoli spring( 高仓雄 - gcx )
 */
/*若是url需要拼接，则将mock方法移至所需页面中去，再进行拼接，将处理后的url导入，本例中，由于文件有限加载，故而所需token值还未赋值*/

/* --------------  常规模块  --------------*/
//重复验证
import {checkRepeatUrl, checkRepeat, mockTest_checkRepeat} from './template/common/checkRepeat';
mockTest_checkRepeat(checkRepeatUrl, checkRepeat);
//提交布尔返回
import {bolbackUrl, bolback, mockTest_bolback} from './template/common/bolback';
mockTest_bolback(bolbackUrl, bolback);

/* --------------  用户模块  --------------*/
//登录 （第一次登录）
import {login_firstUrl, login_first, mockTest_login_first} from '../mock/template/login/first';
mockTest_login_first(login_firstUrl, login_first);
//登录 （普通用户登录）
import {login_normalUrl, login_normal, mockTest_login_normal} from '../mock/template/login/normal';
mockTest_login_normal(login_normalUrl, login_normal);
//登录 （管理员登录）
import {login_adminUrl, login_admin, mockTest_login_admin} from '../mock/template/login/admin';
mockTest_login_admin(login_adminUrl, login_admin);
//自动的登录
import {loginAutoUrl, loginAuto, mockTest_loginAuto} from '../mock/template/front/loginAuto';
mockTest_loginAuto(loginAutoUrl, loginAuto);

//个人信息
import {personal_infoUrl, personal_info, mockTest_personal_info} from '../mock/template/user/userData';
mockTest_personal_info(personal_infoUrl, personal_info);

//侧边栏 - 管理员（权限） 菜单
import {adminSidebarNavUrl, adminSidebarNav, mockTest_adminSidebarNav} from './template/role/admin-sidebarNav';
mockTest_adminSidebarNav(adminSidebarNavUrl, adminSidebarNav);

//侧边栏 - 普通用户（权限） 菜单
import {userSidebarNavUrl, userSidebarNav, mockTest_userSidebarNav} from './template/role/user-sidebarNav';
mockTest_userSidebarNav(userSidebarNavUrl, userSidebarNav);


/* --------------  管理员模块  --------------*/
//管理员 - 用户列表
import {userListDataUrl, userListData, mockTest_userListData} from '../mock/template/admin/userList';
mockTest_userListData(userListDataUrl, userListData);

//管理员 - 搜索用户
import {userFullDataUrl, perFullInfo, mockTest_userFullData} from '../mock/template/user/userFullData';
mockTest_userFullData(userFullDataUrl, perFullInfo);

/* --------------  消息 模块  --------------*/
//内部 通告
import {announcementUrl, announcement, mockTest_announcement} from './template/news/announcement';
mockTest_announcement(announcementUrl, announcement);
//消息
import {messageUrl, message, mockTest_message} from './template/news/message';
mockTest_message(messageUrl, message);

/* --------------  产品企划  --------------*/
import {producPlanningUrl, producPlanning, mockTest_producPlanning} from './template/planning/product-planning';
mockTest_producPlanning(producPlanningUrl, producPlanning);


/* --------------  仓储模块  --------------*/
//增加仓储
import {DepotAddUrl, DepotAdd, mockTest_DepotAdd} from './template/store/DepotAdd';
mockTest_DepotAdd(DepotAddUrl, DepotAdd);

//仓储 入库
import {DepotList_InUrl, DepotList_In, mockTest_DepotList_In} from './template/store/DepotList-In';
mockTest_DepotList_In(DepotList_InUrl, DepotList_In);

//仓储 入库  搜索
import {DepotList_In_SearchUrl, DepotList_In_Search, mockTest_DepotList_In_Search} from './template/store/DepotList-In-Search';
mockTest_DepotList_In_Search(DepotList_In_SearchUrl, DepotList_In_Search);

//仓储 出库
import {DepotList_OutUrl, DepotList_Out, mockTest_DepotList_Out} from './template/store/DepotList-Out';
mockTest_DepotList_Out(DepotList_OutUrl, DepotList_Out);

//仓储 出库 搜索
import {DepotList_Out_SearchUrl, DepotList_Out_Search, mockTest_DepotList_Out_Search} from './template/store/DepotList-Out-Search';
mockTest_DepotList_Out_Search(DepotList_Out_SearchUrl, DepotList_Out_Search);

//仓储 分类管理 面辅料分类目录数据
import {DepotClassifyUrl, DepotClassify, mockTest_DepotClassify} from './template/store/DepotClassify';
mockTest_DepotClassify(DepotClassifyUrl, DepotClassify);

// //仓储  面辅料分类目录数据加载
// import {accessoriesListUrl, accessoriesList, mockTest_accessoriesList} from './template/store/accessoriesList';
// mockTest_accessoriesList(accessoriesListUrl, accessoriesList);


/* --------------  图库模块  --------------*/
//图库 - 时装周列表
import {fashionWeekListUrl, fashionWeekList, mockTest_fashionWeekList} from '../mock/template/picture/fw-list';
mockTest_fashionWeekList(fashionWeekListUrl, fashionWeekList);
//图库 - 时装周大图
import {fashionWeekDataUrl, fashionWeekData, mockTest_fashionWeekData} from '../mock/template/picture/fw-search';
mockTest_fashionWeekData(fashionWeekDataUrl, fashionWeekData);


/* --------------  图形模块  --------------*/
/* -- 饼状图 - 员工 -- */
import {pieChart_staffUrl, pieChart_staff, mockTest_pieChart_staff} from './template/echart/pieChart-staff';
mockTest_pieChart_staff(pieChart_staffUrl, pieChart_staff);

/* -- 柱状图 - 出入库数量 -- */
import {barChart_billMovingUrl, barChart_billMoving, mockTest_barChart_billMoving} from './template/echart/barChart-billMoving';
mockTest_barChart_billMoving(barChart_billMovingUrl, barChart_billMoving);

/* -- 折线图 - 营收统计 -- */
import {lineChart_revenueUrl, lineChart_revenue, mockTest_lineChart_revenue} from './template/echart/lineChart-revenue';
mockTest_lineChart_revenue(lineChart_revenueUrl, lineChart_revenue);



