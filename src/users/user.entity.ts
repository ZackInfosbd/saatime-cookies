import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { PublicFile } from '../files/publicFile.entity';
// import Address from './address.entity';
// import Post from '../posts/post.entity';
// import LocalFile from '../localFiles/localFile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column({ nullable: true })
  @Expose()
  public phoneNumber?: string;

  @Column()
  @Expose()
  public name: string;

  @Column({ nullable: true })
  @Expose()
  public surname?: string;

  @Column({ nullable: true })
  public password?: string;

  @Column({ default: false })
  @Expose()
  public isRegisteredWithGoogle: boolean;

  @Column({
    nullable: true,
  })
  public currentHashedRefreshToken?: string;

  @Column({ default: false })
  @Expose()
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  @Expose()
  public isPhoneNumberConfirmed: boolean;

  @Column({ nullable: true })
  @Expose()
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  @Expose()
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ default: false })
  @Expose()
  public isVendor: boolean;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => PublicFile, {
    nullable: true,
  })
  public avatar?: PublicFile;

  // @JoinColumn({ name: 'avatarId' })
  // @OneToOne(() => PublicFile, {
  //   nullable: true,
  // })
  // public avatar?: PublicFile;

  // @Column({ nullable: true })
  // public avatarId?: number;

  // @OneToOne(() => Address, {
  //   eager: true,
  //   cascade: true,
  // })
  // @JoinColumn()
  // public address: Address;

  // @OneToMany(() => Post, (post: Post) => post.author)
  // public posts?: Post[];

  // @Column()
  // public stripeCustomerId: string;
  // @Column({ nullable: true })
  // public monthlySubscriptionStatus?: string;

  // @Column()
  // public stripeCustomerId: string;
}
