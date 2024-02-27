import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
// import { PermissionEntity } from '@/modules/system/entities/permission.entity';
// import { UserService } from '@/modules/user/services/user.service';
// import { PERMISSION_DEF } from '@/common/decorators';
// import { SUPER_ADMIN } from '@/common/constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  // constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // const user = request.user;
    //
    // if (!user) return true;
    //
    // // 超级管理员拥有所有权限
    // if (user.email === SUPER_ADMIN) return true;
    //
    // // 拿到接口权限配置
    // const apiPermission: PermissionEntity = Reflect.getMetadata(
    //   PERMISSION_DEF,
    //   context.getClass().prototype,
    //   context.getHandler().name,
    // );
    //
    // // 如果没有接口没有权限配置，表示该接口不需要访问权限
    // if (!apiPermission) return true;
    //
    // const permissions: PermissionEntity[] = await this.userService.findUserPermissionsByUserId(user.id);
    //
    // console.log({ permissions, apiPermission });

    // 判断用户拥有该接口的权限
    // return permissions.some((permission) => permission.identify === apiPermission.identify);

    return false;
  }
}
