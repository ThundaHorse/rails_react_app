class Api::V1::RecipesController < ApplicationController
  before_action :authenticate_user

  def index
    @recipe = Recipe.where(user_id: current_user.id).order(created_at: :desc)
    render json: @recipe
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private

  def recipe_params
    params.permit(:user_id, :name, :image, :ingredients, :instruction)
  end

  def recipe
    @recipe ||= Recipe.where(user_id: current_user.id, id: params[:id]).first
  end
end
