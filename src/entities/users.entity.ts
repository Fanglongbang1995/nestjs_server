import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity()
export class users {
  // 会以类名来创建表,如果是驼峰命名的,生成的表名是下划线区分
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ length: 100, comment: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ length: 50, comment: '名字', unique: true })
  name: string;

  @Column({ comment: '年龄' })
  age: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '性别',
    nullable: true,
    // default: null,
  })
  gender: string;

  @Column({
    type: 'varchar',
    length: 60,
    comment: '简介',
    nullable: true,
    // default: null,
  })
  profile: string;

  @Column({
    type: 'varchar',
    length: 60,
    comment: '密码',
    nullable: false,
    // default: null,
  })
  password: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}