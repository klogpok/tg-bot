import { Telegraf, Markup } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './command.class';

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }
    handle(): void {
        this.bot.start((ctx) => {
            ctx.reply(
                'Do you like me?',
                Markup.inlineKeyboard([
                    Markup.button.callback('👍', 'course_like'),
                    Markup.button.callback('👎', 'course_dislike'),
                ])
            );
        });

        this.bot.action('course_like', (ctx) => {
            ctx.session.courseLike = true;
            ctx.editMessageText('🎉 Cool!');
        });

        this.bot.action('course_dislike', (ctx) => {
            ctx.session.courseLike = false;
            ctx.editMessageText('😒 Bad');
        });
    }
}
