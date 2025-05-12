class BlogsController < ApplicationController
  include Authenticable
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  before_action :set_blog, only: %i[show edit update destroy ]

  def index
    blogs = Blog.all
    render json: blogs
  end

  def show
    render json: @blog
  end

  def new
    @blog = Blog.new
  end

  def edit
  end

  def create
    blog = Blog.new(blog_params)
    blog.user_id = current_user.id

    if blog.save
      render json: { blog: blog }, status: :created
    else
      render json: { errors: blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @blog.update(blog_params)
      render json: { blog: @blog }
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @blog.destroy
    render json: { message: "Blog deleted successfully" }
  end

  def search
    blogs = Blog.search(params[:query])
    render json: blogs
  end
  def filter
    @blogs = Blog.includes(:user).all
  if params[:published].present?
    is_published = ActiveModel::Type::Boolean.new.cast(params[:published])
    @blogs = @blogs.where(published: is_published)
  end
  
  render json: @blogs
  end


  private

  def set_blog
    @blog = Blog.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Blog not found" }, status: :not_found
  end

  def blog_params
     params.require(:blog).permit(:title, :content, :tags, :published, :user_id)          
  end
end
