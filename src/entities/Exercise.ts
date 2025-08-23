import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid'
import {File} from "./File"

@Entity("exercise")
class Exercise {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    repetition: string
    
    @Column()
    weight: number
    
    @Column()
    rest: string

    @Column()
    comments: string

    @Column()
    file_reference: string

    @JoinColumn({name: "file_reference"})
    @ManyToOne(() => File, {
        onDelete: "CASCADE"
    })
    fileReference: File
    
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

export {Exercise}