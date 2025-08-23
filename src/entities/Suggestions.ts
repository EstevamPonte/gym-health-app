import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("suggestions")
class Suggestions {
    @PrimaryColumn()
    readonly id: string

    @Column()
    subject: string

    @Column()
    sugestionType: string

    @Column()
    comments: string

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

export {Suggestions}