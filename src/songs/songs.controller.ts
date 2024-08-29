import { Controller, Get, Post, Put, Delete, ParseIntPipe, HttpStatus, Param, HttpException, Body, Inject, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connections';

@Controller(
    {
        path: 'songs',
        scope: Scope.REQUEST
    }
)
export class SongsController {
    constructor(
        private songsService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection,
    ){
        console.log(`THIS IS THE CONNECTION STRING ${this.connection.CONNECTION_STRING}`);
    }
    @Post()
    create(@Body() createSongDTO: CreateSongDTO){
        return this.songsService.create(createSongDTO);
    }
    @Get()
    findAll(){
        try{
        return this.songsService.findAll();
        }
        catch (e) {
            throw new HttpException(
                'server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: e
                },
            );
        }
    }
    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}),
        )
        id: number,
    ){
        return 'fetch a song based on the id';        
    }
    @Put(':id')
    update(){
        return 'update song based on the id';
    }
    @Delete(':id')
    delete(){
        return 'delete song based on the id';
    }

}
