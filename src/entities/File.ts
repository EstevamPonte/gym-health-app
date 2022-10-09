import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid'
import {User} from "./User"

@Entity("file")
class File {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    user_reference: number

    @JoinColumn({name: "user_reference"})
    @ManyToOne(() => User)
    userReference: User
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export {File}