import { Request, Response } from 'express';
import {
  Controller,
  Get,
  HttpCode,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GithubGuard } from '../common/guards/github.guard';
import { Public } from '../common/guards/public.guard';

@Controller('/auth')
export class AuthController {
  @Public()
  @UseGuards(GithubGuard)
  @Get('/github')
  async githubLogin() {
    // GithubStrategy to redirect to github login page
  }

  @Public()
  @Get('/github/callback')
  @UseGuards(GithubGuard)
  @Redirect('/')
  public githubLoginCallback(): { url: string } {
    return { url: process.env.HOST_URL };
  }

  @Public()
  @HttpCode(204)
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    // @ts-ignore
    req.logout();
    res.redirect('http://localhost:3000');
  }
}
